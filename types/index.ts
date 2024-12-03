declare module "bun" {
  interface Env {
    /**
     * @example "/Users/username/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault"
     */
    OBSIDIAN_PATH: string;
  }
}
