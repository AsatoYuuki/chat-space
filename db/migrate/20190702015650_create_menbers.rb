class CreateMenbers < ActiveRecord::Migration[5.0]
  def change
    create_table :menbers do |t|
      t.references :group, foreign_kye: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
