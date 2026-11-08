import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { register } from "../services/authService";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;
    const e = {
      name: validateRequired("họ tên")(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: !confirm ? "Vui lòng nhập lại mật khẩu" : confirm === password ? null : "Mật khẩu nhập lại không khớp",
    };
    setErrors(e);
    setSubmitError(null);
    if (Object.values(e).some(Boolean)) return;

    setLoading(true);
    try {
      const { user, token } = await register(name, email, password);
      signIn(user, token);
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Tạo tài khoản mới</Text>
        <FormField label="Họ tên" value={name} placeholder="Nguyễn Văn A"
          onChangeText={(v) => { setName(v); setErrors((old) => ({ ...old, name: null })); }}
          error={errors.name} autoCapitalize="words" autoComplete="name" />
        <FormField label="Email" value={email} placeholder="email@example.com" keyboardType="email-address"
          onChangeText={(v) => { setEmail(v); setErrors((old) => ({ ...old, email: null })); }} error={errors.email} />
        <FormField label="Mật khẩu" value={password} placeholder="Tối thiểu 6 ký tự" secureTextEntry
          onChangeText={(v) => { setPassword(v); setErrors((old) => ({ ...old, password: null })); }} error={errors.password} />
        <FormField label="Nhập lại mật khẩu" value={confirm} placeholder="Nhập lại mật khẩu" secureTextEntry
          onChangeText={(v) => { setConfirm(v); setErrors((old) => ({ ...old, confirm: null })); }} error={errors.confirm} />
        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
        <PrimaryButton title="Đăng ký" onPress={submit} loading={loading} />
        <Pressable onPress={() => navigation.replace("Login", route.params)}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
});
