'use client'

import { useState } from 'react'
import { IoInformationCircle } from 'react-icons/io5'
import { useTranslation } from '../context/LanguageContext'
export default function InfoButton()  {
  const { t } = useTranslation()
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="rounded-full bg-primary p-3 text-white shadow-lg transition-transform duration-300 hover:scale-110"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        type="button"
        aria-describedby={showTooltip ? 'info-tooltip' : undefined}
        aria-label={t('common.infoButtonTooltip', 'I created this site using Cursor and prompt engineering skills without any Next.js knowledge.')}
      >
        <IoInformationCircle className="h-6 w-6" />
      </button>
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 w-64 rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow-lg" role="tooltip" id="info-tooltip">
          {t('common.infoButtonTooltip', 'I created this site using Cursor and prompt engineering skills without any Next.js knowledge.')}
        </div>
      )}
    </div>
  )
}


