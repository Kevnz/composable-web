Vagrant::Config.run do |config|
 
    config.vm.box = "base"

    config.vm.share_folder "brightleaf", "/home/vagrant/brightleaf", "./"
    config.vm.forward_port 3000, 4567
    config.vm.forward_port 27017, 27017
    config.vm.provision :chef_solo do |chef| 
        chef.cookbooks_path = "../zertis/cookbooks"
        chef.add_recipe "nodejs" 
        chef.add_recipe "mongodb-debs" 
        # You may also specify custom JSON attributes:
        chef.json = {
            "nodejs" => {
                "version" => "0.8.6"
            } 
        }
    end
end
