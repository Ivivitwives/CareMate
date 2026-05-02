import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const pages = [0, 1, 2] as const;

export default function OnboardingScreen() {
  const router = useRouter();

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(22);
  const illustrationOpacity = useSharedValue(0);
  const illustrationScale = useSharedValue(0.93);
  const footerOpacity = useSharedValue(0);
  const footerTranslateY = useSharedValue(16);
  const floatValue = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const illustrationStyle = useAnimatedStyle(() => ({
    opacity: illustrationOpacity.value,
    transform: [
      { scale: illustrationScale.value },
      { translateY: interpolate(floatValue.value, [0, 1], [0, -8]) },
    ],
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
    transform: [{ translateY: footerTranslateY.value }],
  }));

  useEffect(() => {
    titleOpacity.value = withTiming(1, {
      duration: 650,
      easing: Easing.out(Easing.cubic),
    });
    titleTranslateY.value = withSpring(0, {
      damping: 14,
      stiffness: 90,
    });

    illustrationOpacity.value = withDelay(
      220,
      withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      }),
    );
    illustrationScale.value = withDelay(
      220,
      withSpring(1, {
        damping: 12,
        stiffness: 90,
      }),
    );

    footerOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 650,
        easing: Easing.out(Easing.cubic),
      }),
    );
    footerTranslateY.value = withDelay(
      500,
      withSpring(0, {
        damping: 16,
        stiffness: 85,
      }),
    );

    floatValue.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
  }, []);

  const handleNext = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundOrbTop} />
      <View style={styles.backgroundOrbBottom} />

      <Animated.View style={[styles.header, titleStyle]}>
        <Text style={styles.title}>Stay Healthy, Stay On Track</Text>
        <Text style={styles.subtitle}>
          Medicine Tracker helps you remember your medicines and stay healthy.
        </Text>
      </Animated.View>

      <Animated.View style={[styles.illustrationWrap, illustrationStyle]}>
        <View style={styles.illustrationGlow} />
        <View style={styles.illustrationBase}>
          <View style={styles.leafLeft} />
          <View style={styles.leafRight} />

          <View style={styles.bottle}>
            <View style={styles.bottleCap} />
            <View style={styles.bottleBody}>
              <View style={styles.crossVertical} />
              <View style={styles.crossHorizontal} />
            </View>
          </View>

          <View style={styles.clockRing}>
            <View style={styles.clockCenter} />
            <View style={styles.clockHandShort} />
            <View style={styles.clockHandLong} />
          </View>

          <View style={styles.pillLarge} />
          <View style={styles.pillSmall} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.footer, footerStyle]}>
        <View style={styles.dotsRow}>
          {pages.map((page) => (
            <OnboardingDot key={page} active={page === 0} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={handleNext}
        >
          <Text style={styles.buttonLabel}>Next</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function OnboardingDot({ active }: { active: boolean }) {
  const pulse = useSharedValue(active ? 1 : 0.45);

  useEffect(() => {
    if (!active) {
      return;
    }

    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0.45, { duration: 700, easing: Easing.inOut(Easing.cubic) }),
      ),
      -1,
      true,
    );
  }, [active, pulse]);

  const style = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [
      { scale: active ? interpolate(pulse.value, [0.45, 1], [1, 1.2]) : 1 },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        active ? styles.dotActive : styles.dotInactive,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F7F4FF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 28,
    overflow: "hidden",
  },
  backgroundOrbTop: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(105, 76, 222, 0.10)",
    top: -90,
    right: -80,
  },
  backgroundOrbBottom: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(105, 76, 222, 0.10)",
    bottom: -100,
    left: -70,
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "#17141F",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.4,
    maxWidth: 320,
  },
  subtitle: {
    marginTop: 12,
    color: "#6E6A7E",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 310,
  },
  illustrationWrap: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 360,
  },
  illustrationGlow: {
    position: "absolute",
    bottom: 28,
    width: 240,
    height: 28,
    borderRadius: 999,
    backgroundColor: "rgba(82, 64, 162, 0.14)",
  },
  illustrationBase: {
    width: 320,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
  },
  bottle: {
    position: "absolute",
    left: 72,
    bottom: 56,
    alignItems: "center",
  },
  bottleCap: {
    width: 60,
    height: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#7E6AE2",
  },
  bottleBody: {
    width: 78,
    height: 118,
    borderRadius: 18,
    backgroundColor: "#6448D8",
    marginTop: -1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#38268F",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  crossVertical: {
    position: "absolute",
    width: 16,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#F8F5FF",
  },
  crossHorizontal: {
    position: "absolute",
    width: 56,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#F8F5FF",
  },
  clockRing: {
    position: "absolute",
    right: 58,
    top: 68,
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 6,
    borderColor: "#5E49D0",
    backgroundColor: "#F7F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  clockCenter: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#5E49D0",
  },
  clockHandShort: {
    position: "absolute",
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: "#5E49D0",
    top: 18,
    left: 32,
    transform: [{ rotate: "24deg" }],
  },
  clockHandLong: {
    position: "absolute",
    width: 4,
    height: 24,
    borderRadius: 2,
    backgroundColor: "#5E49D0",
    top: 23,
    left: 42,
    transform: [{ rotate: "126deg" }],
  },
  leafLeft: {
    position: "absolute",
    left: 28,
    bottom: 58,
    width: 64,
    height: 34,
    borderTopLeftRadius: 34,
    borderBottomLeftRadius: 34,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 24,
    backgroundColor: "#9ED8C2",
    transform: [{ rotate: "-28deg" }],
    opacity: 0.9,
  },
  leafRight: {
    position: "absolute",
    right: 34,
    bottom: 34,
    width: 76,
    height: 36,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: "#8FD1B9",
    transform: [{ rotate: "18deg" }],
    opacity: 0.92,
  },
  pillLarge: {
    position: "absolute",
    left: 112,
    bottom: 64,
    width: 28,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#EF7D54",
    transform: [{ rotate: "-34deg" }],
  },
  pillSmall: {
    position: "absolute",
    left: 145,
    bottom: 48,
    width: 22,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#F2A39B",
    transform: [{ rotate: "18deg" }],
  },
  footer: {
    width: "100%",
    alignItems: "center",
    gap: 18,
    paddingBottom: 12,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: "#5F4DCB",
  },
  dotInactive: {
    width: 8,
    backgroundColor: "#B8AFD9",
  },
  button: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    backgroundColor: "#6B50E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#4834A6",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: -1,
  },
});
