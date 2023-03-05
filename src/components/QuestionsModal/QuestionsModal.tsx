import { Box, Button, Grid, Modal, styled, Typography } from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloseIcon from '@mui/icons-material/Close';

import { HiddenQuestion } from "../../context/types";

const ModalContent = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100svh',
    padding: '10px',
}));

type QuestionsModalProps = {
    data: HiddenQuestion[];
    isOpen: boolean;
    onHide: () => void;
    onRestoreArchivedPost: (id: string) => void;
};

const QuestionsModal = ({ data, isOpen, onHide, onRestoreArchivedPost }: QuestionsModalProps) => {
    return (
        <Modal
            open={isOpen}>
            <ModalContent>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} md={8} lg={6} >

                        {/* Content column */}
                        <Grid container direction='column' sx={{ backgroundColor: '#333' }}>
                            {/* Header */}
                            <Grid item xs={12} sx={{ backgroundColor: '#282828', padding: '10px', }}>
                                <Grid container>
                                    <Grid item xs={11}>
                                        <Typography variant="h6">
                                            {
                                                data.length > 0 ?
                                                    'Archived questions' :
                                                    'No archived questions'
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button onClick={onHide}>
                                            <CloseIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Items list */}
                            {data.length > 0 &&
                                < Grid item xs={12} sx={{ padding: '10px', }} >

                                    {data.map(question => {
                                        return (
                                            <Grid key={question.id} container>
                                                <Grid item xs={11}>
                                                    <Typography>
                                                        {question.question}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Button onClick={() => onRestoreArchivedPost(question.id)}>
                                                        <PlaylistAddIcon />
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        );
                                    })}
                                </Grid>
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </ModalContent>
        </Modal >
    );
};
export default QuestionsModal;