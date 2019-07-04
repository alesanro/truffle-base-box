pragma solidity >=0.4.21 <0.6.0;

contract Clock {

    function time() public view returns (uint) {
        /* solium-disable security/no-block-members */
        return now;
    }
}
