//Rad Tree'de hiyerarşik olarak bir node check edildiğinde 
//altındakilerin ve üstündekilerin durumunu günceller.
function UpdateAllChildren(nodes, checked) {
    var i;
    for (i = 0; i < nodes.get_count() ; i++) {
        if (checked) {
            nodes.getNode(i).check();
        }
        else {
            nodes.getNode(i).set_checked(false);
        }

        if (nodes.getNode(i).get_nodes().get_count() > 0) {
            UpdateAllChildren(nodes.getNode(i).get_nodes(), checked);
        }
    }
}

function UpdateAllParent(node) {


    if (node != undefined && node.get_parent() != null) {

        node.set_checked(false);

        var childNodes = node.get_nodes();

        var i;
        for (i = 0; i < childNodes.get_count() ; i++) {
            isChecked = childNodes.getNode(i).get_checked();
            if (isChecked) {
                node.check();
                break;
            }
        }

        UpdateAllParent(node.get_parent());

    }
}

function AfterCheck(sender, eventArgs) {

    var node = eventArgs.get_node();

    //Child Nodes (if any)
    UpdateAllChildren(node.get_nodes(), node.get_checked());

    //Parent Nodex (if any)
    UpdateAllParent(node.get_parent());

}

function ArsivClientNodeClicked(sender, eventArgs) {
    var node = eventArgs.get_node();
    var nodeUrl = node.get_attributes().getAttribute("url");
    if (nodeUrl != "#") {
        window.open(nodeUrl, 'Arşiv Dosyaları', "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no");
    }
}
