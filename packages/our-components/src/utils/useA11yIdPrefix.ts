import { useState } from 'react'

let idCounter = 0

export const useA11yIdPrefix = (text: string) =>
  // eslint-disable-next-line no-plusplus
  useState(() => `zora-a11y-${idCounter++}-${text}`)[0]
