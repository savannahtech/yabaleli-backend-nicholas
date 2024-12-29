import { comparePassword, hashPassword } from "./auth";

describe("auth Utils", () => {
	describe("hashPassword", () => {
		it("should hash a password successfully", () => {
			const password = "testPassword123";
			const hashedPassword = hashPassword(password);

			expect(hashedPassword).toBeDefined();
			expect(hashedPassword).not.toBe(password);
			expect(hashedPassword).toMatch(/^\$2[aby]\$\d{1,2}\$/);
		});

		it("should create different hashes for same password", () => {
			const password = "testPassword123";
			const hash1 = hashPassword(password);
			const hash2 = hashPassword(password);

			expect(hash1).not.toBe(hash2);
		});

		it("should handle empty string", () => {
			const password = "";
			expect(() => hashPassword(password)).not.toThrow();
		});
	});

	describe("comparePassword", () => {
		it("should return true for matching password", async () => {
			const password = "testPassword123";
			const hashedPassword = hashPassword(password);

			const isMatch = await comparePassword(password, hashedPassword);
			expect(isMatch).toBe(true);
		});

		it("should return false for non-matching password", async () => {
			const password = "testPassword123";
			const wrongPassword = "wrongPassword123";
			const hashedPassword = hashPassword(password);

			const isMatch = await comparePassword(wrongPassword, hashedPassword);
			expect(isMatch).toBe(false);
		});
	});

	describe("Error cases", () => {
		it("should throw error when password is undefined", () => {
			expect(() => hashPassword(undefined as unknown as string)).toThrow();
		});

		it("should throw error when comparing with undefined hash", async () => {
			await expect(
				comparePassword("password", undefined as unknown as string),
			).rejects.toThrow();
		});
	});
});
