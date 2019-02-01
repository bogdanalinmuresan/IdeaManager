import {User} from "./user";
import { Tag } from "./tag";
import { Comment } from "./Comment";
import { Upload } from "./upload";

export class Idea {
    public id: string;
    public title: string;
    public description: string;
    public owner?: string;
    public username?: string;
    public timestamp: number;
    public positiveVotes: number;
    public negativeVotes: number;
    public published: boolean;
    public shortDescription: string;
    public tags: Tag[];
    public comments: Comment[];
    public attachments: Upload[];
}
