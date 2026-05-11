import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWalletData, WalletData } from '../../services/walletService';
import WalletChart from '../../graph/WalletChart';
import TotalChart from '../../graph/TotalChart';
import { useUser } from '../../context/UserContext';
import { achievements, userRank } from '../../mock/achievements';
import { placeholderStats } from '../../mock/placeholderUser';
import { styles, SCREEN_W } from './ProfileScreen.styles';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { userData } = useUser();
  const [activeWallet, setActiveWallet] = useState(0);
  const [walletDataMap, setWalletDataMap] = useState<Map<string, WalletData | null>>(new Map());
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (userData.wallets.length === 0) { setLoading(false); return; }
    setLoading(true);
    Promise.all(
      userData.wallets.map(addr =>
        fetchWalletData(addr)
          .then(data => [addr, data] as [string, WalletData])
          .catch(() => [addr, null] as [string, null])
      )
    ).then(entries => {
      setWalletDataMap(new Map(entries));
      setLoading(false);
    });
  }, [userData.wallets.join(',')]);

  const totalUSD = [...walletDataMap.values()].reduce((sum, w) => sum + (w?.totalUSD ?? 0), 0);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setActiveWallet(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <View style={styles.charPill}>
            <Text style={styles.charPillText}>Trenches</Text>
          </View>
          <Text style={styles.rankBadge}>{userRank.icon}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userData.wallets.length}</Text>
            <Text style={styles.statLabel}>WALLETS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{placeholderStats.followers}</Text>
            <Text style={styles.statLabel}>FOLLOWERS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{placeholderStats.following}</Text>
            <Text style={styles.statLabel}>FOLLOWING</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('Settings' as never)}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* NAVN */}
      <View style={styles.nameSection}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.handle}>{userData.handle}</Text>
        <View style={styles.tagsRow}>
          {achievements.filter(a => a.unlocked).map((a, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{a.icon} {a.name}</Text>
            </View>
          ))}
        </View>
        {userData.bio ? <Text style={styles.bio}>{userData.bio}</Text> : null}
      </View>

      {/* TOTAL CHART */}
      <TotalChart
        wallets={userData.wallets
          .map(addr => {
            const w = walletDataMap.get(addr);
            return w ? { address: addr, solBalance: w.solBalance, currentValue: w.totalUSD } : null;
          })
          .filter(Boolean) as { address: string; solBalance: number; currentValue: number }[]}
        totalUSD={totalUSD}
        fallbackHistory={[]}
      />

      {/* WALLET PAGER */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={styles.pager}
      >
        {userData.wallets.map((addr, index) => {
          const walletData = walletDataMap.get(addr) ?? null;
          const short = `${addr.slice(0, 6)}...${addr.slice(-4)}`;
          return (
            <View key={addr} style={[styles.walletPage, { width: SCREEN_W }]}>
              <View style={styles.walletHeader}>
                <Text style={styles.walletName}>WALLET {index + 1}</Text>
                <Text style={styles.walletAddress}>{short}</Text>
              </View>

              <WalletChart
                address={addr}
                solBalance={walletData?.solBalance ?? 0}
                currentValue={walletData?.totalUSD ?? 0}
                fallbackHistory={[]}
              />

              <View style={styles.tradesSection}>
                <Text style={styles.tradesLabel}>HOLDINGS</Text>
                {loading ? (
                  <ActivityIndicator color="#444444" style={{ marginTop: 16 }} />
                ) : walletData ? (
                  <>
                    <View style={styles.tokenRow}>
                      <Text style={styles.tokenSymbol}>SOL</Text>
                      <Text style={styles.tokenName}>Solana</Text>
                      <View style={styles.tokenRight}>
                        <Text style={styles.tokenAmount}>{walletData.solBalance.toFixed(4)}</Text>
                        {walletData.solUSD > 0 && (
                          <Text style={styles.tokenUSD}>${walletData.solUSD.toFixed(2)}</Text>
                        )}
                      </View>
                    </View>
                    {walletData.tokens.map(t => (
                      <View key={t.mint} style={styles.tokenRow}>
                        <Text style={styles.tokenSymbol} numberOfLines={1}>{t.symbol}</Text>
                        <Text style={styles.tokenName} numberOfLines={1}>{t.name}</Text>
                        <View style={styles.tokenRight}>
                          <Text style={styles.tokenAmount}>
                            {t.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </Text>
                          {t.usdValue != null && (
                            <Text style={styles.tokenUSD}>${t.usdValue.toFixed(2)}</Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </>
                ) : (
                  <Text style={styles.errorText}>Could not load wallet</Text>
                )}
              </View>
            </View>
          );
        })}

        {/* Add wallet — åpner Settings */}
        <TouchableOpacity
          style={[styles.walletPage, styles.addPage, { width: SCREEN_W }]}
          onPress={() => navigation.navigate('Settings' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.addPageIcon}>
            <Text style={styles.addPagePlus}>+</Text>
          </View>
          <Text style={styles.addPageLabel}>ADD WALLET</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* DOTS */}
      <View style={styles.dots}>
        {userData.wallets.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeWallet && styles.dotActive]} />
        ))}
        <View style={[styles.dot, styles.dotAdd,
          activeWallet === userData.wallets.length && styles.dotActive]}
        />
      </View>

    </ScrollView>
  );
}

