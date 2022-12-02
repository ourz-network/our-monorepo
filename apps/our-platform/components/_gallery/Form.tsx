'use client'

/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWeb3Wallet } from '@zoralabs/simple-wallet-provider'
import { css } from '@emotion/react'
import { Tone } from 'degene-sais-quoi/dist/types/components/Button/styles.css'

import {
  Box,
  BoxProps,
  Button,
  Input,
  Stack,
  Text,
  IconClose,
} from './degene-sais-quoi'

const inputFields = {
  title: {
    type: 'text',
    defaultValue: 'Title',
    label: 'Title',
  },
  desc: {
    type: 'text',
    defaultValue: 'Description',
    label: 'Page Description',
  },
  networkId: {
    type: 'number',
    defaultValue: 1,
    label: `NetworkID`,
  },
  curator: {
    type: 'text',
    defaultValue: '0x',
    label: 'Auction Curator Address',
  },
  contracts: {
    type: 'text',
    defaultValue: '0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7',
    label: 'Addresses of NFT contracts',
  },
  fontFamily: {
    type: 'select',
    options: ['serif', 'sans', 'mono'],
    defaultValue: 'sans',
    label: 'Fonts',
  },
  mode: {
    type: 'select',
    options: ['light', 'dark'],
    defaultValue: 'light',
    label: 'Light/Dark Mode',
  },
  accent: {
    type: 'select',
    options: [
      'blue',
      'green',
      'indigo',
      'orange',
      'pink',
      'purple',
      'red',
      'teal',
      'yellow',
    ],
    label: 'Accent Color',
  },
}

// @ts-expect-error idk
const fields: (keyof typeof inputFields)[] = Object.keys(inputFields)

const SettingsForm = ({
  subdomain,
  address,
  galleryConfig,
  setShowForm,
}: any) => {
  const router = useRouter()
  const wallet = useWeb3Wallet()
  const provider = wallet.library
  const [formData, setFormData] = useState({
    subdomain,
    curator: address,
    contracts:
      '0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7,0xCa21d4228cDCc68D4e23807E5e370C07577Dd152,0x12C8630369977eE708C8E727d8e838f74D9420C5,0xb80fBF6cdb49c33dC6aE4cA11aF8Ac47b0b4C0f3',
    networkId: 1,
    ...galleryConfig,
  })
  const [disabledButton, setDisabledButton] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleClick = (field: keyof typeof inputFields, option: any) => {
    setFormData({
      ...formData,
      [field]: option,
    })
  }

  // const updateColor = ({ name, color }: any) => {
  //   setFormData({
  //     ...formData,
  //     [name]: color,
  //   })
  // }

  const submitForm = async () => {
    setDisabledButton(() => true)
    try {
      const signedMessage = await provider
        .getSigner()
        .signMessage(JSON.stringify(formData))
      const res = await fetch(`/api/gallery/${subdomain}`, {
        method: 'POST',
        body: JSON.stringify({
          galleryConfig: formData,
          signedMessage,
        }),
      })

      if (res) {
        setDisabledButton(() => false)
        setShowForm(() => false)
        console.log('refreshing...', await res.json())
        router.refresh()
      }
    } catch (error) {
      console.log(error)
      setDisabledButton(() => false)
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='inline-flex place-self-end'>
          <Button tone='red' onClick={() => setShowForm(() => false)}>
            <IconClose color='red' />
          </Button>
        </div>
        <Box
          display='flex'
          alignItems='center'
          width='full'
          flexDirection='column'
          gap='2'
        >
          {fields.map((field) => (
            <div
              key={field}
              // @ts-expect-error css
              css={css`
                text-transform: none;
                color: var(--colors-text);
              `}
            >
              <Box
                display='flex'
                textAlign='center'
                alignItems='center'
                flexDirection='column'
                padding='5'
              >
                {inputFields[`${field}`].type === 'text' && (
                  <Input
                    label={`${inputFields[`${field}`].label}`}
                    name={field}
                    type={
                      inputFields[`${field}`].type as
                        | 'number'
                        | 'text'
                        | 'email'
                        | undefined
                    }
                    defaultValue={galleryConfig[`${field}`]}
                    onChange={(e) => handleChange(e)}
                    width={field === ('contracts' || 'curator') ? '96' : 'full'}
                  />
                )}
                {inputFields[`${field}`].type === 'number' && (
                  <Input
                    inputMode='numeric'
                    label={`${inputFields[`${field}`].label}`}
                    name={field}
                    type={
                      inputFields[`${field}`].type as
                        | 'number'
                        | 'text'
                        | 'email'
                        | undefined
                    }
                    defaultValue={galleryConfig[`${field}`]}
                    onChange={(e) => handleChange(e)}
                    width='full'
                  />
                )}
                {inputFields[`${field}`].type === 'select' && (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label>
                    {`${inputFields[`${field}`].label}`}
                    <Stack
                      justify='center'
                      flex='auto'
                      space='max'
                      wrap
                      direction='horizontal'
                    >
                      {/*  @ts-expect-error idk */}
                      {inputFields[`${field}`].options.map((option: string) => (
                        <div key={`${option}`}>
                          <Box width='auto' paddingX='2' marginX='2'>
                            <Button
                              // @ts-expect-error idk
                              tone={
                                field === 'accent' ? (option as Tone) : null
                              }
                              center
                              size='medium'
                              width='32'
                              variant={
                                formData[field] === option
                                  ? 'primary'
                                  : 'invisible'
                              }
                              onClick={() => handleClick(field, option)}
                            >
                              <Text
                                align='center'
                                size='regular'
                                // @ts-expect-error idk
                                font={
                                  field === 'fontFamily'
                                    ? `${option as BoxProps['fontFamily']}`
                                    : null
                                }
                                transform='capitalize'
                              >
                                {`${option}`}
                                {field === 'fontFamily' && ' Families'}
                              </Text>
                            </Button>
                          </Box>
                        </div>
                      ))}
                    </Stack>
                  </label>
                )}
              </Box>
            </div>
          ))}
          <Button
            tone='green'
            center
            size='large'
            shape='circle'
            variant='secondary'
            disabled={disabledButton}
            onClick={() => submitForm()}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default SettingsForm
