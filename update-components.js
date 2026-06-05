const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// Read base components
let headerHtml = fs.readFileSync(path.join(rootDir, 'components/header.html'), 'utf8');
let footerHtml = fs.readFileSync(path.join(rootDir, 'components/footer.html'), 'utf8');

function processFile(filePath, isSubdir) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Prepare Header
    let localHeader = headerHtml;
    if (isSubdir) {
        // Replace relative paths
        localHeader = localHeader
            .replace(/(src|href)="images\//g, '$1="../images/')
            .replace(/href="index\.html/g, 'href="../index.html')
            .replace(/href="trasparenza\.html/g, 'href="../trasparenza.html')
            .replace(/href="privacy\.html/g, 'href="../privacy.html');
        
        // Change the navbar links for subpages: instead of hash links, go to home
        localHeader = localHeader.replace(/<nav>[\s\S]*?<\/nav>/, '<nav><a href="../index.html">Torna alla Home</a></nav>');
    }
    
    // 2. Prepare Footer
    let localFooter = footerHtml;
    if (isSubdir) {
        localFooter = localFooter
            .replace(/(src|href)="images\//g, '$1="../images/')
            .replace(/href="index\.html/g, 'href="../index.html')
            .replace(/href="trasparenza\.html/g, 'href="../trasparenza.html')
            .replace(/href="privacy\.html/g, 'href="../privacy.html');
    }

    // 3. Replace in HTML content
    const headerRegex = /<header class="navbar"[^>]*>[\s\S]*?<\/header>/;
    const footerRegex = /<footer[^>]*>[\s\S]*?<\/footer>/;
    
    let updatedContent = content;
    if (headerRegex.test(content)) {
        updatedContent = updatedContent.replace(headerRegex, localHeader.trim());
    }
    if (footerRegex.test(content)) {
        updatedContent = updatedContent.replace(footerRegex, localFooter.trim());
    }
    
    if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated: ${path.relative(rootDir, filePath)}`);
    }
}

// Find all HTML files
function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'components' && file !== 'local') {
                walk(fullPath);
            }
        } else if (file.endsWith('.html')) {
            const isSubdir = dir !== rootDir;
            processFile(fullPath, isSubdir);
        }
    }
}

walk(rootDir);
console.log('Component sync complete!');
