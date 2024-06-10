import fs from 'fs/promises'; 
// import { OstDocument } from 'outstatic';
// OstDocument[]
export const generateSearchJSON = async (posts: any) => {
    try {
        await fs.writeFile('public/search.json', JSON.stringify(posts, null, 2), 'utf-8');
    } catch (error) {
        console.error('Błąd podczas zapisu pliku search.json:', error);
    }
}