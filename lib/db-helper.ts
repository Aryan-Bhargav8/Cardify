import {db} from "@/lib/db";
import{ File, Playlist,Card, User} from "@prisma/client";

export type FileWithUser = File & {
    user: User;
  }
  export type PlaylistWithUser = Playlist & {
    user: User;
  }
  
  export type CardsWithPlaylist = Card & {
    Playlist: Playlist[],
  }
  
  export type CardsWithPlaylistsWithUsers = Card & {
    Playlist: PlaylistWithUser[],
  }