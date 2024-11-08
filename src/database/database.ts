import { Album, Artist, Favorites, Track, User } from "../types";

export const database: IDatabase = {
	users: [],
	artists: [],
	tracks: [],
	albums: [],
	favorites: [],
};

interface IDatabase {
	albums: Album[];
	artists: Artist[];
	favorites: Favorites[];
	tracks: Track[];
	users: User[];
}
