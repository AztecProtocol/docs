import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GitHubCode = ({ owner, repo, branch='master', filePath, startLine=1, endLine=Infinity }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`
        );
        const content = response.data.content;
        const decodedContent = atob(content); // Decode Base64 content
        
        const lines = decodedContent.split('\n');
        const desiredLines = lines.slice(startLine - 1, endLine).join('\n');
 
        setCode(desiredLines);
      } catch (error) {
        console.error('Failed to fetch GitHub code:', error);
      }
    };

    fetchCode();
  }, [owner, repo, branch, filePath, startLine, endLine]);

  return <pre><code>{code}</code></pre>;
};

export default GitHubCode;