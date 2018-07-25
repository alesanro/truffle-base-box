pragma solidity ^0.4.11;

contract Clock {

    function time() public view returns (uint) {
        /* solium-disable security/no-block-members */
        return now;
    }
}
