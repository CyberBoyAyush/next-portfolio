import GithubSlugger from 'github-slugger';

export interface Heading {
    id: string;
    text: string;
    level: number;
}

export function extractHeadings(content: string): Heading[] {
    const slugger = new GithubSlugger();
    const lines = content.split('\n');
    const headings: Heading[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) continue;

        const match = trimmed.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = slugger.slug(text);
            headings.push({ id, text, level });
        }
    }

    return headings;
}
