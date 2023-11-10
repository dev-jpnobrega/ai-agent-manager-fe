import React from "react"
import { Button, IconButton } from "@material-ui/core"

export const ResponsiveButton = ({ onClick, mobile, disabled, color, alt, Icon, variant, size, className, description, style }) => {
  return (
    <>
      {
        mobile ?
          <IconButton
            disabled={disabled}
            color={color}
            aria-label={alt}
            onClick={onClick}
          >
            <Icon />
          </IconButton> :
          <Button
            disabled={disabled}
            variant={variant}
            color={color}
            size={size}
            className={className}
            startIcon={<Icon />}
            style={style}
            onClick={onClick}
          >
            {description}
          </Button>
      }
    </>
  )
}