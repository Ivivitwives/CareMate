import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();
  const logoScale = useSharedValue(0.7);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const dotsOpacity = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const dotsStyle = useAnimatedStyle(() => ({
    opacity: dotsOpacity.value,
  }));

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    logoScale.value = withSpring(1, {
      damping: 12,
      stiffness: 110,
    });

    textOpacity.value = withDelay(
      300,
      withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
    );

    dotsOpacity.value = withDelay(
      600,
      withRepeat(
        withTiming(1, {
          duration: 700,
          easing: Easing.inOut(Easing.cubic),
        }),
        1,
        true,
      ),
    );

    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2200);

    return () => clearTimeout(timer);
  }, [dotsOpacity, logoOpacity, logoScale, router, textOpacity]);

  return (
    <View style={styles.container}>
      <View style={styles.purpleGlow} />
      <Animated.View style={[styles.logoWrap, logoStyle]}>
        <View style={styles.logoCard}>
          <View style={styles.pillOne} />
          <View style={styles.pillTwo} />
          <View style={styles.clockRing}>
            <View style={styles.clockHandShort} />
            <View style={styles.clockHandLong} />
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.copyWrap, textStyle]}>
        <Text style={styles.title}>CareMate</Text>
        <Text style={styles.subtitle}>Medicine reminder made simple.</Text>
      </Animated.View>

      <Animated.View style={[styles.dotsRow, dotsStyle]}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#5B44D6",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  purpleGlow: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    top: -110,
    right: -120,
  },
  logoWrap: {
    marginBottom: 28,
  },
  logoCard: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: "#F7F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  pillOne: {
    position: "absolute",
    width: 28,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#7057E2",
    transform: [{ rotate: "42deg" }],
    left: 26,
    top: 22,
  },
  pillTwo: {
    position: "absolute",
    width: 28,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#A19AF5",
    transform: [{ rotate: "42deg" }],
    left: 42,
    top: 14,
  },
  clockRing: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#7057E2",
    right: 16,
    bottom: 16,
  },
  clockHandShort: {
    position: "absolute",
    width: 2,
    height: 7,
    borderRadius: 1,
    backgroundColor: "#7057E2",
    top: 4,
    left: 10,
  },
  clockHandLong: {
    position: "absolute",
    width: 2,
    height: 9,
    borderRadius: 1,
    backgroundColor: "#7057E2",
    top: 2,
    left: 10,
    transform: [{ rotate: "45deg" }],
  },
  copyWrap: {
    alignItems: "center",
    paddingHorizontal: 28,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 0.4,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 10,
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    textAlign: "center",
  },
  dotsRow: {
    position: "absolute",
    bottom: 58,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.38)",
  },
  dotActive: {
    width: 22,
    backgroundColor: "#FFFFFF",
  },
});
