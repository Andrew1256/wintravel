import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button/Button'
import { Modal } from './Modal'

interface ConfirmationDialogProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	confirmLabel?: string
	cancelLabel?: string
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	confirmLabel,
	cancelLabel
}) => {
	const { t } = useTranslation('filter')

	return (
		<Modal
			className="w-[1280px]"
			isOpen={isOpen}
			onClose={onClose}
			title={title || t('confirmation.title')}
			footer={
				<>
					<Button
						variant="outline"
						onClick={onClose}
						size="xl"
					>
						{cancelLabel || t('confirmation.cancel')}
					</Button>
					<Button
						variant="primary"
						onClick={onConfirm}
						size="xl"
					>
						{confirmLabel || t('confirmation.confirm')}
					</Button>
				</>
			}
		>
			<></>
		</Modal>
	)
}
