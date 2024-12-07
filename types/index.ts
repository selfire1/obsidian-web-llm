declare module "bun" {
  interface Env {
    /**
     * @example "/Users/username/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault"
     */
    OBSIDIAN_PATH: string;
    /**
     * url of the api
     */
    BASE_URL: string;
    API_USER: string;
    API_PASSWORD: string;
  }
}

/**
 * Note in the database
 */
export type Note = {
  id: number;
  /**
   * Note content
   */
  text: string;
  title: string;
  /**
   * Path from the root of the Vault to the note
   */
  path: string;
};

export type InputNote = Omit<Note, "id">;
