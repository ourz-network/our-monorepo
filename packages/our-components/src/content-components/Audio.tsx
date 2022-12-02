'use client'

import {
  Fragment,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useMemo,
} from 'react'

import { useSyncRef } from '../utils/useSyncRef'

import { MediaLoader, useMediaObjectProps } from './MediaLoader'
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from './RendererConfig'

interface FakeWaveformCanvasProps {
  audioRef: any
  uri: string
  audioColors?: {
    progressColor: string
    waveformColor: string
  }
}

const FakeWaveformCanvas = ({
  audioRef,
  uri,
  audioColors,
}: FakeWaveformCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, setWidth] = useState<undefined | number>()
  const updateWidth = useCallback(() => {
    const newWidth =
      canvasRef.current?.parentElement?.getBoundingClientRect().width
    if (newWidth && newWidth !== width) {
      setWidth(newWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current])

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [updateWidth])

  const uriEntropy = useMemo(
    () =>
      uri
        .split('')
        // eslint-disable-next-line no-bitwise
        .reduce((last, char) => last ^ (last + char.charCodeAt(0)), 0),
    [uri]
  )

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    updateCanvasLines()
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    const updateInterval = setInterval(updateCanvasLines, 1000)
    return () => clearInterval(updateInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  const seekAudio: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (evt) => {
      if (audioRef.current && canvasRef.current && width) {
        const position =
          (evt.clientX - canvasRef.current.getBoundingClientRect().left) / width
        // eslint-disable-next-line no-param-reassign
        audioRef.current.currentTime = position * audioRef.current.duration
        audioRef.current.play()
        // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
        updateCanvasLines()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audioRef.current, width]
  )

  const height = 200
  const updateCanvasLines = useCallback(() => {
    if (canvasRef.current && width && audioRef.current) {
      const context = canvasRef.current?.getContext('2d')
      if (!context) {
        return
      }
      context.clearRect(0, 0, width, height)

      for (let i = 0; i < width; i += 5) {
        const sinRnd = Math.sin(i + uriEntropy) * 10000
        const lineHeight = Math.floor(
          Math.min(
            Math.sin((i / width) * 0.2) +
              2 * (sinRnd - Math.floor(sinRnd)) * 40,
            height
          )
        )
        if (
          audioRef.current.currentTime / audioRef.current.duration >
          i / width
        ) {
          context.fillStyle = audioColors?.progressColor ?? '#000'
        } else {
          context.fillStyle = audioColors?.waveformColor ?? '#000'
        }
        context.fillRect(i, (height - lineHeight) / 2, 2, lineHeight)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current, audioRef.current, width])

  return (
    <canvas ref={canvasRef} height={height} width={width} onClick={seekAudio} />
  )
}

export const AudioRenderer = forwardRef<HTMLAudioElement, RenderComponentType>(
  ({ request, getStyles, a11yIdPrefix, theme }, ref) => {
    const [sources, setSources] = useState([
      ...(request?.media?.content?.sources ?? []),
    ])
    const uri = sources[0] // request.media.content?.uri ?? request.media.animation?.uri
    const { props, loading, error } = useMediaObjectProps({
      uri,
      request,
      a11yIdPrefix,
      getStyles,
      preferredIPFSGateway: theme?.preferredIPFSGateway,
    })

    const audioRef = useRef<HTMLAudioElement>(null)
    useSyncRef(audioRef, ref)
    const [playing, setPlaying] = useState<boolean>(false)
    const wrapper = useRef<HTMLDivElement>()

    const togglePlay: MouseEventHandler<HTMLAudioElement> = useCallback(
      (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        if (audioRef.current) {
          if (playing) {
            audioRef.current.pause()
          } else {
            audioRef.current.play()
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [audioRef.current, playing]
    )

    useEffect(() => {
      if (!audioRef.current) {
        return
      }
      if (playing) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioRef.current, playing])

    const playingText = playing ? 'Pause' : 'Play'

    return (
      <MediaLoader getStyles={getStyles} loading={loading} error={error}>
        <div
          ref={wrapper}
          className='flex flex-col justify-center items-center mt-10 w-full'
          // {...getStyles('mediaAudioWrapper')}
        >
          {!loading && (
            <>
              <button
                type='button'
                aria-live='polite'
                aria-pressed={!!playing}
                // @ts-expect-error idk
                onClick={togglePlay}
                title={playingText}
                className={`z-10 ${/** TODO */ ''}`}
                // {...getStyles('mediaPlayButton', undefined, { playing })}
              >
                {playingText}
              </button>
              <div
                className='w-full cursor-pointer'
                // {...getStyles('mediaAudioWaveform')}
              >
                <FakeWaveformCanvas
                  uri={uri || ''}
                  audioRef={audioRef}
                  audioColors={theme?.audioColors}
                />
              </div>
            </>
          )}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            loop
            ref={audioRef}
            preload='auto'
            // eslint-disable-next-line react/no-unknown-property
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            {...props}
            onLoadedData={props.onLoad}
            onCanPlayThrough={props.onLoad}
            // eslint-disable-next-line react/no-unknown-property
            onLoad={undefined}
          />
        </div>
      </MediaLoader>
    )
  }
)

export const Audio: RendererConfig = {
  getRenderingPreference(request: RenderRequest) {
    if (
      request?.media?.content?.type?.startsWith('audio') ??
      request?.media?.animation?.type?.startsWith?.('audio')
    ) {
      return request?.renderingContext === 'FULL'
        ? RenderingPreference.PRIORITY
        : RenderingPreference.LOW
    }
    return RenderingPreference.INVALID
  },
  render: AudioRenderer,
}
