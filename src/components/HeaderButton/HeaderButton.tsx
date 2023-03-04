import { Button, styled, Typography } from "@mui/material";

const FullButton = styled(Button)(() => ({
    width: '100%'
}));

type HeaderButtonProps = {
    label: string;
    onClick: () => void;
};

const HeaderButton = ({ label, onClick }: HeaderButtonProps) => {
    return (
        <FullButton variant="contained" onClick={onClick} >
            <Typography variant="h5">
                {label}
            </Typography>
        </FullButton>
    );
};

export default HeaderButton;