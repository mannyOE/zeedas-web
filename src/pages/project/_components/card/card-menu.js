import React from 'react';
import IconMenu from '../icon-menu';
import { EllipsisHorizontalIcon } from '../../../../zeedas-assets/icons/icon-ellipsis-horizontal';
import { theme } from '../../style';
import { EditIcon } from '../../../../zeedas-assets/icons/icon-edit';
import { TrashIcon } from '../../../../zeedas-assets/icons/icon-trash';
import { ModalConsumer } from '../modal';
import { MenuItem } from '../menu/style';

const iconProps = {
  dimension: {
    width: 12.8,
    height: 10
  },
  color: theme.colors.$zdBlueInverse
}

const deleteIconProps = { ...iconProps, color: theme.colors.red };

export const CardMenu = (props) => {
  const {id} = props;

  return (
      <IconMenu title={<EllipsisHorizontalIcon {...iconProps} />}>
        <React.Fragment>
        <ModalConsumer>
          {({setShowModal, setShowDeleteModal, setEditCardId, setDeleteCardId}) => {
            const handleDelete = () => {
              setDeleteCardId(id);
              setShowDeleteModal(true);
            }
            const handleEdit = () => {
              setEditCardId(id);
              setShowModal(true)
            }
            return (
            <React.Fragment>
              <MenuItem onClick={handleEdit}><EditIcon {...iconProps} /> <p>Edit Module</p></MenuItem>
              <MenuItem onClick={handleDelete} color={theme.colors.red}><TrashIcon {...deleteIconProps} /><p>Remove from Project</p></MenuItem>
            </React.Fragment>
          )}}
        </ModalConsumer>
        </React.Fragment>
      </IconMenu>
  )
}