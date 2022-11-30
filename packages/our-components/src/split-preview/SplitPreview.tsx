'use client'

import { useSplit } from 'our-hooks'
import {
  Box,
  IconSplit,
  Spinner,
  Stack,
  Text,
  useTheme,
} from 'degene-sais-quoi'

const SplitPreview = ({
  splitAddress,
}: {
  splitAddress: string
}): JSX.Element => {
  const { data, splitLoaded } = useSplit(splitAddress)
  const { mode } = useTheme()

  // const { getStyles } = useMediaContext();

  return (
    <Box>
      <Stack direction='vertical'>
        {!splitLoaded ? (
          <Spinner />
        ) : (
          <>
            <IconSplit color={mode === 'dark' ? 'white' : 'black'} />
            <Text>{data?.nickname}</Text>
            {data?.recipients && (
              <Text>{`${data.recipients.length} Recipient${
                data.recipients.length > 1 ? `s` : ``
              }`}</Text>
            )}
          </>
        )}
      </Stack>
    </Box>
  )
}

export default SplitPreview
