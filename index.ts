import { Client } from '@notionhq/client';
import { config } from 'dotenv';
import { resolve } from 'path'

config({
	path: resolve(__dirname, "../.env")
});

const notion = new Client({ auth: process.env.NOTION_API_KEY });

notion.databases.query({
	database_id: process.env.DATABASE_ID
}).then((database) => {
	console.log(database);
});