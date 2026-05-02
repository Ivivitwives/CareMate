import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(22);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerTranslateY.value }],
  }));

  useEffect(() => {
    containerOpacity.value = withTiming(1, {
      duration: 650,
      easing: Easing.out(Easing.cubic),
    });
    containerTranslateY.value = withSpring(0, {
      damping: 16,
      stiffness: 90,
    });
  }, [containerOpacity, containerTranslateY]);

  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backdropTop} />
      <View style={styles.backdropBottom} />

      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#A8A3B8"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#A8A3B8"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
              />
              <Pressable
                onPress={() => setShowPassword((value) => !value)}
                hitSlop={10}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>{showPassword ? "👁" : "👁‍🗨"}</Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.forgotRow}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialButton}>
              <Text style={styles.googleMark}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Text style={styles.appleMark}></Text>
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text style={styles.footerLink}> Sign Up</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F3FF",
    justifyContent: "center",
    paddingHorizontal: 22,
    overflow: "hidden",
  },
  backdropTop: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(109, 78, 219, 0.11)",
    top: -80,
    right: -95,
  },
  backdropBottom: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(109, 78, 219, 0.08)",
    bottom: -90,
    left: -70,
  },
  card: {
    backgroundColor: "#FBFAFF",
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 18,
    shadowColor: "#43308B",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: "#1B1823",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#7A758B",
    textAlign: "center",
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4F4A60",
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E4DFF2",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    color: "#1D1A26",
    fontSize: 15,
  },
  passwordRow: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E4DFF2",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    color: "#1D1A26",
    fontSize: 15,
    paddingVertical: 0,
  },
  eyeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeIcon: {
    fontSize: 16,
    color: "#7A758B",
  },
  forgotRow: {
    alignSelf: "flex-start",
    marginTop: -2,
  },
  forgotText: {
    fontSize: 13,
    color: "#6B50E6",
    fontWeight: "700",
  },
  primaryButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#6B50E6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4A35AE",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    marginTop: 2,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E9E3F5",
  },
  dividerText: {
    color: "#9A95AB",
    fontSize: 12,
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E4DFF2",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  googleMark: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4285F4",
  },
  appleMark: {
    fontSize: 17,
    color: "#111111",
  },
  socialText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2A2535",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  footerText: {
    color: "#7A758B",
    fontSize: 13,
  },
  footerLink: {
    color: "#6B50E6",
    fontSize: 13,
    fontWeight: "800",
  },
});
