import React from "react"
import styled from "styled-components"

const StyledSearch = styled.div`
    padding-top: 25px;
    padding-bottom: 25px;
    display: flex;
    justify-content: center;
`

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`

const StyledInput = styled.input`
    padding: 5px 30px;
    border: 2px solid rgb(180, 180, 180);
    border-radius: 5px;
    font-size: 20px;
    outline: none;
    background-color: transparent;
    transition: 250ms all ease-in-out;
    width: 100%;

    &:focus {
        border-color: rgba(177, 4, 56, 1);
    }

    &::placeholder {
        color: rgb(180, 180, 180);
    }
`

const ClearSearch = styled.img`
    height: 55%;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    opacity: ${props => (props.visible ? 0.4 : 0)};
    transition: 250ms all ease-in-out;
    cursor: pointer;

    &:hover {
        opacity: ${props => (props.visible ? 6 : 0)};
    }
`

const SearchIcon = styled.img`
    height: 55%;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    opacity: 0.4;
`

const Search = ({ search, setSearch }) => {
    return (
        <StyledSearch>
            <InputWrapper>
                <StyledInput
                    placeholder="Suche hier nach Tools..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <ClearSearch
                    visible={search.length > 0}
                    src={require("../../assets/close.svg")}
                    onClick={() => setSearch("")}
                />
                <SearchIcon src={require("../../assets/search.svg")} />
            </InputWrapper>
        </StyledSearch>
    )
}

export default Search
