pragma solidity ^0.4.21;

/// @title For testing purposes.
contract Converter {

    event MethodInvoked(string methodName, bytes msgData, address sender);

    function() external {
    }

    function getHash(bytes32 _arg) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_arg));
    }

    function convertToBytes32(bytes32 _arg) public pure returns (bytes32) {
        return _arg;
    }

    function convertUIntToBytes32(uint _value) public pure returns (bytes32) {
        return bytes32(_value);
    }

    function convertBytes32ToUInt(bytes32 _value) public pure returns (uint) {
        return uint(_value);
    }

    function bitAndBytes32ToBytes32(bytes32 _arg1, bytes32 _arg2) public pure returns (uint) {
        return uint(_arg1) & uint(_arg2);
    }

    function performMethod3(uint/* _arg1*/, string/* _arg2*/, bytes32/* _arg3*/) public returns (bytes) {
        emit MethodInvoked("performMethod3", msg.data, msg.sender);
        return msg.data;
    }
}
