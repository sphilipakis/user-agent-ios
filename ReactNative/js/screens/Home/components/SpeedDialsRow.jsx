import React from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import SpeedDial from '../../../components/SpeedDial';

const openSpeedDialLink = speedDial =>
  NativeModules.BrowserActions.openLink(speedDial.url, '');
const longPressSpeedDial = speedDial =>
  NativeModules.ContextMenu.speedDial(speedDial.url, speedDial.pinned || false);

const styles = StyleSheet.create({
  speedDials: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  speedDial: {
    flex: 0,
    marginVertical: 10,
    width: 80,
  },
});

const EmptySpeedDial = () => <View style={styles.speedDial} />;

export default ({ dials, limit = 4 }) => {
  if (dials.length === 0) {
    return null;
  }
  const emptyCount = limit - dials.length < 0 ? 0 : limit - dials.length;
  const allDials = [
    ...dials.map(dial => (
      <SpeedDial
        key={dial.url}
        styles={{
          container: styles.speedDial,
        }}
        speedDial={dial}
        onPress={openSpeedDialLink}
        onLongPress={longPressSpeedDial}
      />
    )),
    Array(emptyCount)
      .fill(null)
      // eslint-disable-next-line react/no-array-index-key
      .map((_, i) => <EmptySpeedDial key={i} />),
  ];

  return <View style={styles.speedDials}>{allDials}</View>;
};