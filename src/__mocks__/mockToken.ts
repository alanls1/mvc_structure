export const mockValidToken = {
  uid_user_refresh_token: "123",
  id_user: 1,
  refresh_token: "hashed-token",
  user_agent: "test-agent",
  ip_address: "1.1.1.1",
  expires_at: new Date("2025-07-18T12:00:00Z"),
  update: jest.fn().mockResolvedValue(undefined),
};

export const mockExpiredToken = {
  ...mockValidToken,
  expires_at: new Date("2025-07-15T12:00:00Z"),
};
