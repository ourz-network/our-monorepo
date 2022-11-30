'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { useSyncRef } from '../utils/useSyncRef'
import { useA11yIdPrefix } from '../utils/useA11yIdPrefix'

import { MediaLoader, useMediaObjectProps } from './MediaLoader'
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from './RendererConfig'
import { ImageRenderer } from './Image'

export const VideoRenderer = forwardRef<HTMLVideoElement, RenderComponentType>(
  (props, ref) => {
    const { getString, getStyles, request, theme, a11yIdPrefix } = props
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const video = useRef<HTMLVideoElement>(null)

    const controlAriaId = useA11yIdPrefix('video-renderer')
    const uri =
      request.renderingContext === 'FULL'
        ? request.media.content?.uri ?? request.media.animation?.uri
        : request.media.animation?.uri ?? request.media.content?.uri

    const {
      props: mediaProps,
      loading,
      error,
    } = useMediaObjectProps({
      uri,
      request,
      a11yIdPrefix,
      getStyles,
      preferredIPFSGateway: theme?.preferredIPFSGateway,
    })

    useSyncRef(video, ref)

    useEffect(() => {
      const fullScreenCallback = () => {
        setIsFullScreen(!!document.fullscreenElement)
      }
      document.addEventListener('fullscreenchange', fullScreenCallback)
      return () => {
        document.removeEventListener('fullscreenchange', fullScreenCallback)
      }
    }, [])

    const togglePlay = useCallback(() => {
      if (!video.current) {
        return
      }
      if (video.current.paused) {
        video.current.play()
      } else {
        video.current.pause()
      }
    }, [video])

    // eslint-disable-next-line consistent-return
    const openFullscreen = useCallback(() => {
      const elem = video.current
      if (elem && elem.requestFullscreen) {
        setIsMuted(false)
        return elem.requestFullscreen()
      }

      // Thank Apple for this one :(. Needed for iOS
      // @ts-expect-error apple
      if (elem && elem.webkitSetPresentationMode) {
        setIsMuted(false)
        // @ts-expect-error apple
        return elem.webkitSetPresentationMode('fullscreen')
      }
    }, [video])

    const onCanPlay = useCallback(() => {
      setIsPlaying(!video.current?.paused)
    }, [])

    const toggleMute = useCallback(() => {
      if (!video.current) {
        return
      }
      if (video.current.muted) {
        setIsMuted(false)
      } else {
        setIsMuted(true)
      }
    }, [video])

    const playLoop = useCallback(() => {
      if (!video.current) {
        return
      }
      video.current.currentTime = 0
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.current])

    const playingText = isPlaying
      ? getString('VIDEO_CONTROLS_PAUSE')
      : getString('VIDEO_CONTROLS_PLAY')

    // Fallback to rendering an image if loading the video fails
    if (error) {
      return <ImageRenderer {...props} />
    }

    return (
      <MediaLoader getStyles={getStyles} loading={loading} error={error}>
        {video.current && (
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <div
            aria-label={getString('VIDEO_CONTROLS_LABEL')}
            id={controlAriaId}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            // @ts-expect-error Blur is kinda invalid but okay to be unsafe here.
            onMouseOut={(evt) => evt.target.blur()}
            className='hidden z-10' // TODO
            // {...getStyles('mediaVideoControls', undefined, {
            //   isFullPage: request.renderingContext === 'FULL',
            // })}
          >
            <button
              type='button'
              className='mediaFullscreenButton'
              // {...getStyles('mediaFullscreenButton')}
              aria-pressed={!!isFullScreen}
              onClick={openFullscreen}
              title={getString('VIDEO_CONTROLS_FULLSCREEN')}
            >
              {getString('VIDEO_CONTROLS_FULLSCREEN')}
            </button>
            <button
              type='button'
              className='mediaPlayButton'
              // {...getStyles('mediaPlayButton', undefined, {
              //   playing: isPlaying,
              // })}
              aria-live='polite'
              aria-pressed={!isPlaying}
              onClick={togglePlay}
              title={playingText}
            >
              {playingText}
            </button>
            <button
              type='button'
              className='videoMuteButton'
              // {...getStyles('mediaMuteButton', undefined, { muted: isMuted })}
              onClick={toggleMute}
              aria-pressed={!isMuted}
            >
              {getString('VIDEO_CONTROLS_MUTE')}
            </button>
          </div>
        )}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          {...mediaProps}
          aria-controls={controlAriaId}
          autoPlay
          controls={isFullScreen}
          loop
          muted={isMuted}
          onCanPlayThrough={onCanPlay}
          onEnded={playLoop}
          onLoadedData={mediaProps.onLoad}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          playsInline
          preload='metadata'
          ref={video}
        />
      </MediaLoader>
    )
  }
)

export const Video: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.animation?.type?.startsWith('video/')) {
      return RenderingPreference.PRIORITY
    }
    if (request.media.content?.type?.startsWith('video/')) {
      return RenderingPreference.PRIORITY
    }
    return RenderingPreference.INVALID
  },
  render: VideoRenderer,
}
