import { styled } from "styled-components";

const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    padding: 1rem;
`;

const Logo = styled.div`
    flex-grow: 1;
`;

const Link = styled.a`
    text-decoration: none;
`;

const TopBar: React.FC = () => {
    return (
        <Bar>
            <Logo>
            <p>sunset diaries</p>
            </Logo>
            <Link>about</Link>
            <Link>share your sunset</Link>
        </Bar>
    )
}

export default TopBar;