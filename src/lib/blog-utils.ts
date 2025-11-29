import GithubSlugger from 'github-slugger';

export interface Heading {
    id: string;
    text: string;
    level: number;
}

export function extractHeadings(content: string): Heading[] {
    const slugger = new GithubSlugger();
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = slugger.slug(text);

        headings.push({ id, text, level });
    }

    return headings;
}
