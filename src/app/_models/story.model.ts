import { Image } from "./image.model";
import { Profile } from "./profile.model";

interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Story {
  title: string;
  description: string;
  geometry: Geometry;
  _id?: string;
  images?: Image[];
  user?: Profile;
}
