import React from "react";

import { Typography, SvgIcon } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';

import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import yalmIcon from '../../../assets/images/yaml-icon.svg';
import xmlIcon from '../../../assets/images/xml-icon.svg';

import moment from "moment";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MemoizedReactMarkdown } from '../memoized-react-markdown';
import { CodeBlock } from "../code-block";

import { useStyles } from './styles';
import { pickBetterBytes } from "../../../helpers/formatBytes";

const iconsType = {
  'application/pdf': <PictureAsPdfOutlinedIcon />,
  "image/png": <CropOriginalOutlinedIcon />,
  "image/jpeg": <CropOriginalOutlinedIcon />,
  "image/jpg": <CropOriginalOutlinedIcon />,
  "image/gif": <CropOriginalOutlinedIcon />,
  "image/bmp": <CropOriginalOutlinedIcon />,
  "image/webp": <CropOriginalOutlinedIcon />,
  "image/svg+xml": <CropOriginalOutlinedIcon />,
  "image/x-icon": <CropOriginalOutlinedIcon />,
  "text/xml": <img src={xmlIcon} />,
  "application/x-yaml": <img src={yalmIcon} />,
  'default': <AttachFileIcon />,
}

export const ChatMessage = ({ chat, index, page = 'chat' }) => {
  const classes = useStyles({ withError: chat.error });

  const renderTime = (chat) => (
    <Typography variant='body2' className={classes.chatBalloonTime}>
      {moment(chat.createdAt).format("YYYY-MM-DD HH:mm")}
    </Typography>
  )

  const renderFileIcon = ({ content, error }) => {
    if (error) return <ErrorOutlineOutlinedIcon />
    if (iconsType[content.type]) return iconsType[content.type]

    return iconsType['default']
  }

  const renderChatBalloon = (transcript = false) => (
    <div className={classes[`chatBalloon${chat.role}`]}>
      <div className={classes[`chatBalloonText${chat.role}`]}>
        <MemoizedReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <span className="mb-2 last:mb-0">{children}</span>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] === "▍") return (<span className="mt-1 animate-pulse cursor-default">▍</span>);
                children[0] = (children[0]).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) return <code>{children}</code>
              
              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                />
              );
            },
          }}
        >
          {chat.content.replace(/\\n/g, "  \n")}
        </MemoizedReactMarkdown>
        { transcript && <div className={classes.transcriptInfo}>
          <RecordVoiceOverIcon style={{ fontSize: '10px', marginRight: '6px' }}/>
          {'trascripted'}
          </div> }
      </div>
      {renderTime(chat)}
    </div>
  )

  return (
    <>
      {chat.role === 'Files' &&
        <div className={classes.uploadedFile}>
          <div className={classes.uploadedFileBalloon}>



            {renderFileIcon(chat)}
            <div className={classes.uploadedFileDetails}>
              <div className={classes.uploadedFileDetailsName}>{chat.content.name}</div>
              <div className={classes.uploadedFileDetailsSize}>{pickBetterBytes(chat.content.size)}</div>
            </div>
          </div>
          {renderTime(chat)}
        </div>
      }
      {chat.role !== 'Files' && <div className={classes[`dialog${chat.role}`]} key={`chat-message-agent${index}`}>
        {chat.type === 'audio' &&
          <>
            {page === 'chat' && <audio src={chat.audioUrl} controls></audio>}
            {page === 'history' && renderChatBalloon(true)}
          </>
        }
        {chat.type === 'message' &&
          renderChatBalloon()
        }
      </div>
      }
    </>
  )
}