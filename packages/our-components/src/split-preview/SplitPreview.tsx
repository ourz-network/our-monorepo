import { useSplit } from "@ourz/our-hooks";
import { Box, IconSplit, Spinner, Stack, Text, useTheme } from "degene-sais-quoi";

const SplitPreview = ({ splitAddress }: { splitAddress: string }): JSX.Element => {
  const { data, splitLoaded } = useSplit(splitAddress);
  const { mode } = useTheme();

  // const { getStyles } = useMediaContext();

  return (
    <>
      <Box>
        <Stack direction="vertical">
          {!splitLoaded ? (
            <Spinner />
          ) : (
            <>
              <IconSplit color={mode === "dark" ? "white" : "black"} />
              <Text>{data.data.nickname}</Text>
              <Text>{`${data.data.recipients.length} Recipient${data.data.recipients.length > 1 ? `s` : ``}`}</Text>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default SplitPreview;
