import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: "2ff08705386c04b377c1",
			clientSecret: "619df7ed41f7c4adedf172f73d5f124e766d74c4"
		})
	]
});
