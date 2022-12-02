import { renderHook } from '@testing-library/react-hooks';
import { cache } from 'swr';

import { Networks, OurFetchConfiguration, useENSAddress } from '../src';

describe('useENSAddress', () => {
  beforeEach(() => {
    cache.clear();
  });

  it('loads an ens correctly on mainnet', async () => {
    const NetworkWrapper = ({ children }: any) => (
      <OurFetchConfiguration networkId={Networks.MAINNET}>{children}</OurFetchConfiguration>
    );
    const { waitFor, result } = renderHook(
      () => useENSAddress('0x11CDfCb54576D5990219c426BF2c630115a2012a'),
      { wrapper: NetworkWrapper }
    );

    await waitFor(() => !!result.current.data, { timeout: 5000 });
    expect(result.current.error).toEqual(undefined);
    expect(result.current.data).toEqual('ourz.eth');
  });

  it('loads an ens batch correctly', async () => {
    const NetworkWrapper = ({ children }: any) => (
      <OurFetchConfiguration networkId={Networks.MAINNET}>{children}</OurFetchConfiguration>
    );

    const { waitFor, result } = renderHook(
      () => [
        useENSAddress('0x11CDfCb54576D5990219c426BF2c630115a2012a'),
        useENSAddress('0xf97752a24D83478acA43B04EF7b28789e1D7EEda'),
        // invalid address
        useENSAddress('0x00000000000749f3Ba62f30374Be55841a8c7146'),
      ],
      { wrapper: NetworkWrapper }
    );

    await waitFor(() => !!result.current[2].error, { timeout: 5000 });

    expect(result.current[0].error).toBeUndefined();
    expect(result.current[0].data).toEqual('ourz.eth');
    expect(result.current[1].data).toEqual('nickadamson.eth');
    expect(result.current[2].data).toEqual(undefined);
    expect(result.current[2].error).toMatchInlineSnapshot(`[Error: Not found]`);
  });
});
