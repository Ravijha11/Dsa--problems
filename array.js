function ArrayChallenge(strArr) {
  // Create a map to store the parent-child relationships
  const tree = new Map();

  // Iterate through each string in the input array
  for (const str of strArr) {
    const [child, parent] = str
      .slice(1, -1) // Remove the parentheses
      .split(",") // Split the child and parent values
      .map(Number); // Convert them to numbers

    // If the parent is not in the map, initialize it with an empty array
    if (!tree.has(parent)) {
      tree.set(parent, []);
    }

    // Add the child to the parent's array of children
    tree.get(parent).push(child);
  }

  // Helper function to check if a node has at most two children
  function isValidNode(node, visited = new Set()) {
    // Mark the current node as visited
    visited.add(node);

    // Get the children of the current node
    const children = tree.get(node) || [];

    // If a node has more than two children, it's not a binary tree
    if (children.length > 2) {
      return false;
    }

    // Recursively check the children
    for (const child of children) {
      // If a node is visited twice, it means there's a cycle
      if (visited.has(child)) {
        return false;
      }

      // Check if the child is a valid node
      if (!isValidNode(child, visited)) {
        return false;
      }
    }

    return true;
  }

  // Check if there is a root node (a node with no parent)
  const rootNode = [...tree.keys()].find(node => ![...tree.values()].flat().includes(node));

  // If there's no root node, it's not a binary tree
  if (!rootNode) {
    return "false";
  }

  // Check if the root node is a valid binary tree
  return isValidNode(rootNode) ? "true" : "false";
}

// Keep this function call here
console.log(ArrayChallenge(readline()));
