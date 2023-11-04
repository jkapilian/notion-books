import { Client } from '@notionhq/client';
import { config } from 'dotenv';
import { resolve } from 'path'

config({
	path: resolve(__dirname, "../.env")
});

const notion = new Client({ auth: process.env.NOTION_API_KEY });

notion.databases.query({
	database_id: process.env.DATABASE_ID,
	filter: {
		and: [
			{
				property: "ISBN",
				rich_text: {
					is_not_empty: true
				}
			},
			{
				property: "Title",
				rich_text: {
					is_empty: true
				}
			}
		]
	}
}).then((database) => {
	database.results.forEach(result => {
		let page_id = result.id;
		let isbn = result["properties"].ISBN.title[0].plain_text;
		fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(info => {
			info.json().then(json => {
				let title = json.items[0].volumeInfo.title;
				let author = json.items[0].volumeInfo.authors.toString();
				notion.pages.update({
					page_id: page_id,
					properties: {
						"Title": {
							rich_text: [
								{
									text: {
										content: title
									}
								}
							]
						},
						"Author": {
							rich_text: [
								{
									text: {
										content: author
									}
								}
							]
						}
					}
				});
			});
		})
	})
});