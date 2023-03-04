import { Button, styled, Typography } from "@mui/material";

const FullButton = styled(Button)(() => ({
    height: '100%',
    width: '100%'
}));

type SideButtonProps = {
    label: string;
    onClick: () => void;
};

const SideButton = ({ label, onClick }: SideButtonProps) => {
    return (
        <FullButton variant="text" onClick={onClick} >
            <Typography variant="h5">
                {label}
            </Typography>
        </FullButton>
    );
};

export default SideButton;