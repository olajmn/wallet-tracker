import { useRef, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles, SCREEN_W } from './ProfileScreen.styles';
import { useProfile } from './useProfile';

export default function ProfileScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { userData, updateUser, activeWallet, walletDataMap, totalSOL, totalUSD, onScroll, charWord, snapshotMap } = useProfile();

  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const totalHistory = (() => {
    const dateMap = new Map<string, number>();
    for (const snaps of snapshotMap.values()) {
      for (const s of snaps) {
        dateMap.set(s.date, (dateMap.get(s.date) ?? 0) + s.solBalance);
      }
    }
    return [...dateMap.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(1);
  })();

  function openModal() { setInput(''); setModalVisible(true); }
  function closeModal() { setModalVisible(false); }
  async function addWallet() {
    const addr = input.trim();
    if (!addr || userData.wallets.includes(addr)) { closeModal(); return; }
    await updateUser({ wallets: [...userData.wallets, addr] });
    closeModal();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar} />
          <View style={styles.charPill}>
            <Text style={styles.charPillText}>{charWord}</Text>
          </View>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.handle}>{userData.handle}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{userData.wallets.length}</Text>
          <Text style={styles.statLabel}>WALLETS</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* HERO — TOTAL PORTFOLIO */}
      <TouchableOpacity style={styles.totalCard} onPress={() => setHistoryExpanded(e => !e)} activeOpacity={0.8}>
        <Text style={styles.totalLabel}>TOTAL PORTFOLIO</Text>
        <Text style={styles.totalAmount}>{totalSOL.toFixed(4)} SOL</Text>
        {totalUSD > 0 && <Text style={styles.totalUSD}>${totalUSD.toFixed(2)}</Text>}

        {totalHistory.length > 0 && (
          <View style={styles.historyInCard}>
            {(historyExpanded ? totalHistory : totalHistory.slice(0, 2)).map(([date, sol], i) => {
              const prev = totalHistory[i + 1]?.[1];
              const color = prev == null ? '#FFFFFF' : sol > prev ? '#00FF88' : sol < prev ? '#FF4444' : '#FFFFFF';
              return (
                <View key={date} style={styles.historyRow}>
                  <Text style={styles.historyLabel}>
                    {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Text>
                  <Text style={[styles.historyValue, { color }]}>{sol.toFixed(4)} SOL</Text>
                </View>
              );
            })}
            {!historyExpanded && totalHistory.length > 2 && (
              <Text style={styles.historyMore}>+ {totalHistory.length - 2} more</Text>
            )}
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* WALLET PAGER */}
      {userData.wallets.length === 0 ? (
        <View style={[styles.walletPage, styles.addPage]}>
          <TouchableOpacity
            onPress={openModal}
            activeOpacity={0.7}
            style={{ alignItems: 'center' }}
          >
            <View style={styles.addPageIcon}>
              <Text style={styles.addPagePlus}>+</Text>
            </View>
            <Text style={styles.addPageLabel}>ADD WALLET</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
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

                  <View style={styles.solCard}>
                    <Text style={styles.solAmount}>
                      {walletData ? `${walletData.solBalance.toFixed(4)} SOL` : ''}
                    </Text>
                    <Text style={styles.solUSD}>
                      {walletData && walletData.solUSD > 0 ? `$${walletData.solUSD.toFixed(2)}` : '—'}
                    </Text>
                  </View>

                  {(() => {
                    const snaps = snapshotMap.get(addr) ?? [];
                    const history = [...snaps].reverse().slice(1);
                    if (history.length === 0) return null;
                    return (
                      <View style={styles.historySection}>
                        {history.map((s, i) => {
                          const label = new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                          const prev = history[i + 1]?.solBalance;
                          const color = prev == null ? '#FFFFFF' : s.solBalance > prev ? '#00FF88' : s.solBalance < prev ? '#FF4444' : '#FFFFFF';
                          return (
                            <View key={s.date} style={styles.historyRow}>
                              <Text style={styles.historyLabel}>{label}</Text>
                              <Text style={[styles.historyValue, { color }]}>{s.solBalance.toFixed(4)} SOL</Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })()}

                </View>
              );
            })}

            <TouchableOpacity
              style={[styles.walletPage, styles.addPage, { width: SCREEN_W }]}
              onPress={openModal}
              activeOpacity={0.7}
            >
              <View style={styles.addPageIcon}>
                <Text style={styles.addPagePlus}>+</Text>
              </View>
              <Text style={styles.addPageLabel}>ADD WALLET</Text>
            </TouchableOpacity>

          </ScrollView>

          <View style={styles.dots}>
            {userData.wallets.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeWallet && styles.dotActive]} />
            ))}
            <View style={[styles.dot, styles.dotAdd,
              activeWallet === userData.wallets.length && styles.dotActive]}
            />
          </View>
        </>
      )}

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeModal}>
          <TouchableOpacity activeOpacity={1} style={styles.modalBox}>
            <Text style={styles.modalTitle}>ADD WALLET</Text>
            <TextInput
              style={styles.modalInput}
              value={input}
              onChangeText={setInput}
              placeholder="Wallet address"
              placeholderTextColor="#444"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />
            <TouchableOpacity style={styles.modalBtn} onPress={addWallet}>
              <Text style={styles.modalBtnText}>ADD</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </ScrollView>
  );
}
