# 1. group table, fam table username으로 사용자 검색시 해당 유저가 속한 groupId를 알 수 있음.

# 2. 검색한 사람의 유저 Id를 이용하여 검색한 사람이 속한 groupId를 가져와서 위의 groupId들과 비교하는 로직.

# 3. 추후에 그룹끼리의 팔로우 기능을 추가 할시 내가 속한 groupId와 팔로우된 groupId를 포함해서 1번의 유저가 속한 groupId랑 비교해야됨.

## 즉 조회 할 수 있는 그룹은 총 내가 속한 그룹 + 내가 속한 그룹이 팔로우한 그룹
