import { useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";
import { Box, BoxProps, Button, Input, Stack, Text } from "degene-sais-quoi";
import { IconClose } from "degene-sais-quoi";
// import ColorPicker from "./ColorPicker";

const inputFields = {
  title: {
    type: "text",
    defaultValue: "Title",
    label: "Title",
  },
  desc: {
    type: "text",
    defaultValue: "Description",
    label: "Page Description",
  },
  networkId: {
    type: "number",
    defaultValue: 1,
    label: `NetworkID`,
  },
  curator: {
    type: "text",
    defaultValue: "0x",
    label: "Auction Curator Address",
  },
  contracts: {
    type: "text",
    defaultValue: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
    label: "Addresses of NFT contracts",
  },
  fontFamily: {
    type: "select",
    options: ["serif", "sans", "mono"],
    defaultValue: "sans",
    label: "Fonts",
  },
  mode: {
    type: "select",
    options: ["light", "dark"],
    defaultValue: "light",
    label: "Light/Dark Mode",
  },
  accent: {
    type: "select",
    options: ["blue", "green", "indigo", "orange", "pink", "purple", "red", "teal", "yellow"],
    label: "Accent Color",
  },
};

const fields = Object.keys(inputFields);

const SettingsForm = ({ subdomain, address, userConfig, setShowForm }) => {
  const router = useRouter();
  const wallet = useWeb3Wallet();
  const provider = wallet?.library;
  const [formData, setFormData] = useState({
    subdomain: subdomain,
    curator: address,
    contracts: ["0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7"],
    networkId: 1,
    ...userConfig,
  });
  const [disabledButton, setDisabledButton] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = (field, option) => {
    setFormData({
      ...formData,
      [field]: option,
    });
  };

  const updateColor = ({ name, color }) => {
    setFormData({
      ...formData,
      [name]: color,
    });
  };

  const submitForm = async () => {
    setDisabledButton(() => true);
    try {
      const signedMessage = await provider.getSigner().signMessage(JSON.stringify(formData));
      const res = await fetch(`/api/user/${subdomain}`, {
        method: "POST",
        body: JSON.stringify({
          userConfig: formData,
          signedMessage: signedMessage,
        }),
      });

      if (res) {
        setDisabledButton(() => false);
        setShowForm(() => false);
        router.reload();
      }
    } catch (error) {
      console.log(error);
      setDisabledButton(() => false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div
          css={css`
            display: inline-flex;
            place-self: end;
          `}
        >
          <Button tone="red" onClick={() => setShowForm(() => false)}>
            <IconClose color="red" />
          </Button>
        </div>
        <Box display="flex" alignItems="center" width="full" flexDirection="column" gap="2">
          {fields.map((field) => (
            <div
              key={field}
              css={css`
                text-transform: none;
                color: var(--colors-text);
              `}
            >
              <Box
                display="flex"
                textAlign="center"
                alignItems="center"
                flexDirection="column"
                padding="5"
              >
                {/* {inputFields[`${field}`].type === "color" && (
                  <label>
                    {`${inputFields[`${field}`].label}`}
                    <ColorPicker
                      name={`${field}`}
                      currentValue={userConfig[`${field}`]}
                      updateColor={updateColor}
                    />
                  </label>
                )} */}
                {inputFields[`${field}`].type === "text" && (
                  <Input
                    label={`${inputFields[`${field}`].label}`}
                    name={field}
                    type={inputFields[`${field}`].type}
                    defaultValue={userConfig[`${field}`]}
                    onChange={(e) => handleChange(e)}
                    width={field === ("contracts" || "curator") ? "96" : "full"}
                  />
                )}
                {inputFields[`${field}`].type === "number" && (
                  <Input
                    inputMode="numeric"
                    label={`${inputFields[`${field}`].label}`}
                    name={field}
                    type={inputFields[`${field}`].type}
                    defaultValue={userConfig[`${field}`]}
                    onChange={(e) => handleChange(e)}
                    width="full"
                  />
                )}
                {inputFields[`${field}`].type === "select" && (
                  <label>
                    {`${inputFields[`${field}`].label}`}
                    <Stack
                      justify="center"
                      flex="auto"
                      space="max"
                      wrap={true}
                      direction="horizontal"
                    >
                      {inputFields[`${field}`].options.map((option) => {
                        return (
                          <div key={`${option}`}>
                            <Box width="auto" paddingX="2" marginX="2">
                              <Button
                                tone={field === "accent" ? `${option as Tone}` : null}
                                center
                                size="medium"
                                width="32"
                                variant={formData[field] === option ? "primary" : "invisible"}
                                onClick={(e) => handleClick(field, option)}
                              >
                                <Text
                                  align="center"
                                  font={
                                    field === "fontFamily"
                                      ? `${option as BoxProps["fontFamily"]}`
                                      : null
                                  }
                                  transform="capitalize"
                                >
                                  {`${option}`}
                                  {field === "fontFamily" && " Families"}
                                </Text>
                              </Button>
                            </Box>
                          </div>
                        );
                      })}
                    </Stack>
                  </label>
                )}
              </Box>
            </div>
          ))}
          <Button
            tone="green"
            center={true}
            size="large"
            shape="circle"
            variant="secondary"
            disabled={disabledButton}
            onClick={() => submitForm()}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default SettingsForm;
