import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export const getAutorsByNick = async (nicks: string[]) => {
  
        const fileNicks = nicks.map(nick => {
            return `${nick}.mdx`;
        })
  
        const fileContents: AuthorObject = [];

        for (const nick of fileNicks) { 
            const filePath = path.join('./src/data/authors', nick);
            try {
                const fileContent = await fs.readFile(filePath, 'utf-8');

                const { frontmatter, content } = await compileMDX<{
                name: string,
                avatar: string,
                occupation: string,
                company: string,
                github: string,
                linkedin: string,
            }>
                ({
            source: fileContent,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, {
                          behavior: 'wrap'
                        }],
                    ],
                },
            }
                });

                const author = {
                    meta: {
                        name: frontmatter.name,
                        avatar: frontmatter.avatar,
                        occupation: frontmatter.occupation,
                        company: frontmatter.company,
                        github: frontmatter.github,
                        linkedin: frontmatter.linkedin,
                    }, content
                }
                
                fileContents.push(author)
            } catch(error) {
                console.error(`Błąd podczas odczytu pliku dla autora ${nick}:`, error);
            }
        }
        return fileContents
}
    

export const getAuthors = async () => {
    let fileContents: AuthorObject = [];
    const folderPath = './src/data/authors'; 
    try {
        const files = await fs.readdir(folderPath);
        const filterFiles = files.filter(file => !file.includes('default'))
        for (const file of filterFiles) {
            const filePath = path.join('./src/data/authors', file);

            try {
                const fileContent = await fs.readFile(filePath, 'utf-8');

                const { frontmatter, content } = await compileMDX<{
                name: string,
                avatar: string,
                occupation: string,
                company: string,
                github: string,
                linkedin: string,
            }>
                ({
            source: fileContent,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, {
                          behavior: 'wrap'
                        }],
                    ],
                },
            }
                });

                const author = {
                    meta: {
                        name: frontmatter.name,
                        avatar: frontmatter.avatar,
                        occupation: frontmatter.occupation,
                        company: frontmatter.company,
                        github: frontmatter.github,
                        linkedin: frontmatter.linkedin,
                    }, content
                }
                
                // Sprawdzenie, czy obiekt o danej wartości 'name' już istnieje w tablicy
                const existingAuthor = fileContents.find(existing => existing.meta.name === frontmatter.name);

                // Dodanie tylko jeśli obiekt o danej wartości 'name' nie istnieje
                if (!existingAuthor) {
                    fileContents.push(author);
                }

            } catch(error) {
                 console.error(`Błąd podczas odczytu pliku dla autora:`, error);
            }
        }
    }
    catch(error) {
        console.error(`Błąd podczas odczytu folderu dla autorów:`, error);
    }
    
    return fileContents
}