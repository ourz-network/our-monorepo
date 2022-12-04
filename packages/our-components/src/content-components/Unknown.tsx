import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from './RendererConfig'

export const Unknown: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.content?.type?.startsWith('text/')) {
      return RenderingPreference.LOW
    }
    return RenderingPreference.FALLBACK
  },

  render: ({ request, getStyles }: RenderComponentType) => (
    <div
      className='self-center'
      // {...getStyles('mediaObjectMessage')}
    >
      {request.media.content?.type || 'unknown'}
    </div>
  ),
}
