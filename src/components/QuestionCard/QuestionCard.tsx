import { useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';

import { Question } from "../../context/types";
import QuestionCardContent from "./QuestionCardContent";

const Card = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#333',
    textAlign: 'center',
    flexDirection: 'column',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '5px 5px 5px #111'
}));

const Header = styled(Box)(() => ({
    display: 'flex',
    textAlign: 'center',
}));

type QuestionCardProps = {
    data: Question;
    onArchive: (id: string) => void;
};

const QuestionCard = ({ data, onArchive }: QuestionCardProps) => {
    const { id, question, answer, example } = data;
    const [answered, setAnswered] = useState(false);

    const handleClick = () => {
        if (!answered)
            setAnswered(true);
    };

    return (
        <Card onClick={handleClick} sx={{ cursor: answered ? 'default' : 'pointer' }}>
            <Header>
                <Typography variant="h5" sx={{ flex: 1 }}>
                    {question}
                </Typography>
                {answered &&
                    <Button onClick={() => onArchive(id)} >
                        <InventoryIcon />
                    </Button>
                }
            </Header>
            {answered ?
                <QuestionCardContent answer={answer} example={example} /> :
                <Typography variant="caption">Click to show</Typography>
            }
        </Card>
    );
};

export default QuestionCard;