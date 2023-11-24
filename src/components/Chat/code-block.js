import React, { memo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useStyles } from './styles';
import { ResponsiveButton } from "../ResponsiveButton";
import { useMediaQuery } from '@material-ui/core'

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import GetAppIcon from '@material-ui/icons/GetApp';

import { useTranslation } from "react-i18next";

export const programmingLanguages = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

const buttonProps = {
  codeCopy: {
    color: '#6CB8E6',
    icon: FileCopyOutlinedIcon
  },
  saveCopy: {
    color: '#6CB8E6',
    icon: GetAppIcon
  },
  success: {
    color: '#4caf50',
    icon: DoneOutlineIcon
  }
}

export const generateRandomString = (length, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock = memo(({ language, value }) => {
  const [t] = useTranslation('translation')
  const mobile = useMediaQuery('(max-width:450px)');
  const classes = useStyles()

  const [copyCode, setCopyCode] = useState(buttonProps.codeCopy)
  const [saveCode, setSaveCode] = useState(buttonProps.saveCopy)

  const handleSucces = (func, props) => {
    setTimeout(() => func(props), 1000)
  }

  const handleCopyValue = () => {
    navigator.clipboard.writeText(value)

    setCopyCode(buttonProps.success)
    handleSucces(setCopyCode, buttonProps.codeCopy)
  }

  const handleDownloadCode = () => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(value));
    element.setAttribute('download', `codeToClipBoard${programmingLanguages[language]}`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);

    setSaveCode(buttonProps.success)
    handleSucces(setSaveCode, buttonProps.saveCopy)
  }

  return (
    <div className={classes.codeBlock}>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: "100%",
          background: "transparent",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.9rem",
            fontFamily: "Roboto",
            backgroundColor: "#111b27"
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
      <div classes={classes.codeBlockButtons} style={{ paddingLeft: '12px' }}>
        <ResponsiveButton
          mobile={mobile}
          size="small"
          variant="contained"
          alt="Copy"
          Icon={copyCode.icon}
          style={{ backgroundColor: '#111b27', color: copyCode.color, transition: 'all 2s' }}
          description={t('chat.agent.code.block.copy')}
          onClick={handleCopyValue}
        />
        <ResponsiveButton
          mobile={mobile}
          size="small"
          variant="contained"
          alt="Copy"
          Icon={saveCode.icon}
          style={{ backgroundColor: '#111b27', color: saveCode.color, transition: 'all 2s' }}
          description={t('chat.agent.code.block.save')}
          onClick={handleDownloadCode}
        />
      </div>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };