import React from "react";

import { Typography, SvgIcon } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
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

export const ChatMessage = ({ chat, index }) => {
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

  return (
    <>
      {chat.role === 'Files' &&
        <div className={classes.uploadedFile}>
          {chat.type === 'audio' &&
            <audio src={chat.content} controls></audio>
          }
          {chat.type === 'message' &&
            <div className={classes.uploadedFileBalloon}>



              {renderFileIcon(chat)}
              <div className={classes.uploadedFileDetails}>
                <div className={classes.uploadedFileDetailsName}>{chat.content.name}</div>
                <div className={classes.uploadedFileDetailsSize}>{pickBetterBytes(chat.content.size)}</div>
              </div>
            </div>
          }

          {renderTime(chat)}
        </div>
      }
      {chat.role !== 'Files' && <div className={classes[`dialog${chat.role}`]} key={`chat-message-agent${index}`}>
        <div className={classes[`chatBalloon${chat.role}`]}>
          <div className={classes[`chatBalloonText${chat.role}`]}>
            {/* {chat.type === 'message' && chat.content}
          {chat.type === 'picture' && <img src={chat.content} alt="Send By Agent" className={classes.chatImage} />}
          {chat.type === 'file' &&
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GetAppIcon fontSize="large" />
              <a href="../../assets/images/peru.png" download>
                {chat.content}
              </a>
            </div>
          } */}
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <span className="mb-2 last:mb-0">{children}</span>;
                },
                code({ node, inline, className, children, ...props }) {
                  if (children.length) {
                    if (children[0] === "▍") {
                      return (
                        <span className="mt-1 animate-pulse cursor-default">
                          ▍
                        </span>
                      );
                    }

                    children[0] = (children[0]).replace("`▍`", "▍");
                  }

                  const match = /language-(\w+)/.exec(className || "");

                  if (inline) {
                    return (
                      <code>
                        {children}
                      </code>
                    );
                  }

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
          </div>
          {renderTime(chat)}
        </div>
      </div>
      }
    </>
  )
}